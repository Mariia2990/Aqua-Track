import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import photo from '/img/avatar-default.svg';
import sprite from '/img/sprite.svg';
import css from './UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema.js';
import { updateUser, uploadUserAvatar } from '../../redux/auth/operations.js';
import { selectUser, selectUserAvatar } from '../../redux/auth/selectors.js';

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [amount, setAmount] = useState(1.8);
  const [gender, setGender] = useState('woman');
  console.log(user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: user.gender,
      name: user.name,
      email: user.email,
      weight: user.weight,
      time: user.time,
      water: user.water / 1000,
    },
  });

  const avatarPhoto = useSelector(selectUserAvatar);

  const [avatarPreview, setAvatarPreview] = useState(
    avatarPhoto !== '' ? avatarPhoto : photo,
  );

  const weight = watch('weight');
  const time = watch('time');
  const avatar = watch('avatar');

  useEffect(() => {
    if (weight && gender && time) {
      let newAmount;
      if (gender === 'man') {
        newAmount = weight * 0.04 + time * 0.6;
      }
      if (gender === 'woman') {
        newAmount = weight * 0.03 + time * 0.4;
      }
      setAmount((Math.ceil(newAmount * 10) / 10).toFixed(1));
    }
  }, [gender, time, weight]);

  const hiddenFileInput = useRef(null);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      if (hiddenFileInput.current) {
        hiddenFileInput.current.click();
      }
    },
    [hiddenFileInput],
  );
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    if (isAvatarSelected) formData.append('avatar', file);
    try {
      await dispatch(uploadUserAvatar(formData));
      toast.success('The avatar has been updated successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
    setValue('avatar', null);
  };

  const handleChange = useCallback(
    (event) => {
      if (event.target.files) {
        const fileUploaded = event.target.files[0];
        setAvatarPreview(URL.createObjectURL(fileUploaded));
        setValue('avatar', fileUploaded, {
          shouldValidate: true,
        });
        setIsAvatarSelected(true);
        uploadAvatar(fileUploaded);
        console.log(fileUploaded);
      }
    },
    [setValue, setIsAvatarSelected, setAvatarPreview],
  );

  // useEffect(() => {
  //   if (avatar && avatar[0]) {
  //     console.log(avatar[0]);
  //     uploadAvatar(avatar[0]);
  //   }
  // }, [avatar, dispatch, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const hasChanged = (fieldName) => data[fieldName] !== user[fieldName];

    if (hasChanged('gender')) formData.append('gender', data.gender);
    if (hasChanged('name')) formData.append('name', data.name);
    if (hasChanged('email')) formData.append('email', data.email);
    if (hasChanged('weight')) formData.append('weight', data.weight);
    if (hasChanged('water')) formData.append('water', data.water);
    if (hasChanged('time')) formData.append('time', data.time);

    if (isAvatarSelected || Object.keys(data).some((key) => hasChanged(key))) {
      try {
        dispatch(updateUser(formData));
        toast.success('The settings has been updated successfully!');
        onClose();
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.userPic}>
          <h2>Setting</h2>
          <div className={css.picWrapper}>
            <div className={css.pic}>
              <img className={css.avatar} src={avatarPreview} alt="avatar" />
            </div>
            <div className={css.uploadWrapper} onClick={handleClick}>
              <svg className={css.iconUpload}>
                <use href={sprite + '#icon-upload'} />
              </svg>
              <p className={css.textRegular}>Upload a photo</p>
            </div>
            <input
              type="file"
              {...register('avatar')}
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: 'none' }}
              accept=".jpg,.jpeg,.png,.webp"
            />
          </div>
        </div>
        <div className={css.inputs}>
          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <h3>Your gender identity</h3>
              <div className={css.radioContainer}>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="woman"
                    value="woman"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setValue('gender', e.target.value);
                    }}
                    checked={gender === 'woman'}
                  />
                  <label className={css.radioLabel} htmlFor="woman">
                    Woman
                  </label>
                </div>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="man"
                    value="man"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setValue('gender', e.target.value);
                    }}
                    checked={gender === 'man'}
                  />
                  <label className={css.radioLabel} htmlFor="man">
                    Man
                  </label>
                </div>
              </div>
            </div>
            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                Your name
                <input
                  className={`${css.userInfoInput} ${
                    errors.name ? css.error : ''
                  }`}
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <span className={css.errorSpan}>{errors.name.message}</span>
                )}
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>Email</h3>
                <input
                  className={`${css.userInfoInput} ${
                    errors.email ? css.error : ''
                  }`}
                  type="email"
                  {...register('email')}
                />
                {errors.email && (
                  <span className={css.errorSpan}>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className={css.midContainer}>
              <h3>My daily norma</h3>
              <div className={css.formulaContainer}>
                <div className={css.formula}>
                  <p className={css.textRegular}>For woman:</p>
                  <p className={css.textAccent}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div className={css.formula}>
                  <p className={css.textRegular}>For man:</p>
                  <p className={css.textAccent}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>
              <div className={css.textarea} readOnly>
                <span className={css.textAccent}>*</span> V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </div>
              <div className={css.note}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M7.57934 10.4315C7.64769 11.1434 7.76356 11.6724 7.92303 12.0214C8.08447 12.3693 8.37106 12.5429 8.78478 12.5429C8.86212 12.5429 8.93131 12.5308 8.99994 12.5167C9.07025 12.5308 9.13916 12.5429 9.21706 12.5429C9.62966 12.5429 9.91709 12.3693 10.0777 12.0214C10.238 11.6724 10.3519 11.1434 10.4217 10.4315L10.789 4.93532C10.8573 3.86404 10.8922 3.09538 10.8922 2.62879C10.8922 1.99372 10.7265 1.49816 10.3941 1.14238C10.0605 0.7866 9.62234 0.609131 9.07953 0.609131C9.05056 0.609131 9.02891 0.6156 9.0005 0.616725C8.9735 0.6156 8.95128 0.609131 8.92316 0.609131C8.37922 0.609131 7.94187 0.7866 7.60887 1.14238C7.27616 1.49872 7.10938 1.99457 7.10938 2.62907C7.10938 3.09566 7.14341 3.86432 7.21287 4.9356L7.57934 10.4315ZM9.01428 14.5518C8.48722 14.5518 8.03947 14.718 7.66766 15.0505C7.29612 15.3832 7.10994 15.7871 7.10994 16.2613C7.10994 16.7965 7.29837 17.2178 7.67244 17.5238C8.04819 17.8298 8.48637 17.9828 8.98728 17.9828C9.49719 17.9828 9.94184 17.832 10.3221 17.5297C10.7018 17.2282 10.8916 16.8046 10.8916 16.2618C10.8916 15.7876 10.7099 15.3838 10.3466 15.051C9.98319 14.718 9.53909 14.5518 9.01344 14.5518"
                    fill="#9BE1A0"
                  />
                </svg>
                <p className={css.textRegular}>Active time in hours</p>
              </div>
            </div>
          </div>

          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <div className={`${css.userInfoInputContainer} ${css.down}`}>
                <p className={css.textRegular}>Your weight in kilograms:</p>
                <input
                  className={`${css.userInfoInput} ${
                    errors.weight ? css.error : ''
                  }`}
                  type="number"
                  {...register('weight')}
                  placeholder="0"
                />
                {errors.weight && (
                  <span className={css.errorSpan}>{errors.weight.message}</span>
                )}
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  The time of active participation in sports:
                </p>
                <input
                  className={`${css.userInfoInput} ${
                    errors.time ? css.error : ''
                  }`}
                  type="number"
                  {...register('time')}
                  placeholder="0"
                />
                {errors.time && (
                  <span className={css.errorSpan}>{errors.time.message}</span>
                )}
              </div>
            </div>
            <div className={css.midContainer}>
              <div className={`${css.userInfoInputContainer} ${css.amount}`}>
                <p className={css.textRegular}>
                  The required amount of water in liters per day:
                </p>
                <p className={css.textAccent}>{`${amount ? amount : 1.8} L`}</p>
              </div>
            </div>
            <div className={css.userInfoInputContainer}>
              <h3>Write down how much water you will drink:</h3>
              <input
                className={`${css.userInfoInput} ${
                  errors.water ? css.error : ''
                }`}
                type="number"
                {...register('water')}
                placeholder="1.8"
              />
              {errors.water && (
                <span className={css.errorSpan}>{errors.water.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className={css.buttonContainer}>
          <button className={css.saveButton} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsForm;
