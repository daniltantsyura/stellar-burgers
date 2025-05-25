import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, isActive ? styles.link_active : null)
          }
          to='/'
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'disabled'} />
              <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, isActive ? styles.link_active : null)
          }
          to='/feed'
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'disabled'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <NavLink
        to='/profile'
        className={({ isActive }) =>
          clsx(
            styles.link_position_last,
            styles.link,
            isActive ? styles.link_active : null
          )
        }
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'disabled'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
