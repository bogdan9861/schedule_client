import {useEffect, useState} from 'react';
import {useRequest} from './useRequest';

export const Service = params => {
  const {request} = useRequest();

  const getAllGroups = async () => {
    return await request(`/groups`);
  };

  const register = async ({name, login, password, groupId}) => {
    return await request(`/users/register`, 'POST', {
      name,
      login,
      password,
      groupId,
    });
  };

  const login = async ({login, password}) => {
    return await request(`/users/login`, 'POST', {
      login,
      password,
    });
  };

  const getEvent = async () => {
    return await request('/events');
  };

  const getSchedule = async () => {
    return await request('/schedules');
  };

  const currentUser = async () => {
    return await request('/users');
  };

  const editUser = async ({id, name, groupId, login}) => {
    return await request(`/users/${id}`, 'PUT', {name, groupId, login});
  };

  return {
    getAllGroups,
    register,
    login,
    getEvent,
    getSchedule,
    currentUser,
    editUser,
  };
};
