import { ProfileUI } from '@ui-pages';
import { TUser } from '@utils-types';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUser,
  updateUserThunk
} from '../../services/slices/UserSlice/UserSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const user = useSelector(getUser) as TUser;
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name,
    email: user?.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(updateUserThunk(formValue));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name,
      email: user?.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
