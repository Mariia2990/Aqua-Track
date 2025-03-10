import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';

import sprite from '../../img/sprite.svg';
import { updateWater } from '../../redux/water/operations';

import css from './WaterForm.module.css';

const API_URL = 'https://aquatrack-1v64.onrender.com/water';

const waterSchema = yup.object().shape({
  amountWater: yup.string().required('This field is required'),
  time: yup
    .string()
    .required('This field is required')
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
});

export const WaterForm = ({ waterInfo, onClose }) => {
  const dispatch = useDispatch();

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(waterSchema),
    // check if there are correct values in the waterInfo object
    defaultValues: {
      amountWater: waterInfo?.water || 50,
      time: waterInfo?.time || getCurrentTime(),
    },
  });

  const amountWater = Number(watch('amountWater'));

  const increment = () => {
    setValue('amountWater', amountWater + 50);
  };

  const decrement = () => {
    setValue('amountWater', amountWater >= 50 ? amountWater - 50 : amountWater);
  };

  const convertTimeToDate = (time) => {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':');
    currentDate.setHours(hours, minutes, 0, 0);
    return currentDate.toISOString();
  };

  const onSubmit = async (data) => {
    try {
      const timeDate = convertTimeToDate(data.time);

      if (waterInfo) {
        const formattedData = {
          id: waterInfo?.id,
          volume: Number(data.amountWater),
          date: timeDate,
        };

        await dispatch(updateWater(formattedData));

        toast.success('Water data updated successfully!');
      } else {
        const newWaterData = {
          volume: data.amountWater,
          date: timeDate,
        };

        await axios.post(API_URL, newWaterData);

        toast.success('Water data added successfully!');
      }

      onClose();
    } catch (error) {
      // temporary error handling
      console.error('Error:', error.response?.data || error.message);

      toast.error('Something went wrong, please try again!');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={css.form__title}>Correct entered data:</h3>
      <div className={`${css.form__row} ${css.form__row_counter}`}>
        <p>Amount of water:</p>
        <div className={css.form__counter}>
          <button
            type="button"
            className={css.form__counter_btn}
            onClick={decrement}
            disabled={amountWater <= 50}
          >
            <svg
              className={`${css.form__counter_icon} ${
                amountWater <= 50 ? css.form__counter_icon_disabled : ''
              }`}
            >
              <use href={`${sprite}#icon-minus`} />
            </svg>
          </button>
          <div className={css.form__counter_value}>
            {amountWater === '' ? 0 : amountWater} ml
          </div>
          <button
            type="button"
            className={css.form__counter_btn}
            onClick={increment}
          >
            <svg className={css.form__counter_icon}>
              <use href={`${sprite}#icon-plus`} />
            </svg>
          </button>
        </div>
      </div>

      <div className={`${css.form__row} ${css.form__row_time}`}>
        <label htmlFor="time">Recording time:</label>
        <input
          className={`${css.form__input} ${
            errors.time && css.form__input_error
          }`}
          id="time"
          placeholder="hh:mm"
          {...register('time')}
        ></input>
        {errors.time ? (
          <p className={css.form__errorMessage}>{errors.time.message}</p>
        ) : null}
      </div>

      <div className={`${css.form__row} ${css.form__row_water}`}>
        <label htmlFor="amountWater">Enter the value of the water used:</label>
        <Controller
          name="amountWater"
          control={control}
          render={({ field }) => (
            <input
              className={`${css.form__input} ${
                errors.amountWater && css.form__input_error
              }`}
              type="number"
              id="amountWater"
              {...field}
              onBlur={(event) => {
                if (
                  event.target.value === '' ||
                  isNaN(Number(event.target.value))
                ) {
                  setValue('amountWater', 50);
                }
              }}
            />
          )}
        />
        {errors.amountWater ? (
          <p className={css.form__errorMessage}>{errors.amountWater.message}</p>
        ) : null}
      </div>
      <button type="submit" className={`buttonGreen ${css.form__button}`}>
        Save
      </button>
    </form>
  );
};
