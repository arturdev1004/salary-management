import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import roleReducer from './roleSlice';
import imageReducer from './imageSlice';
import userReducer from './localSlice';
import routeReducer from './routeSlice';
import advanceSearchSlice from './advanceSearchSlice';
import leadSlice from './leadSlice'
import propertyCustomFiledSlice from './propertyCustomFiledSlice';
import propertySlice from './propertySlice';
import contactSlice from './contactSlice';
import contactCustomFiledSlice from './contactCustomFiledSlice';
import leadCustomFiledSlice from './leadCustomFiledSlice';
import taskSlice from './taskSlice';
import meetingSlice from './meetingSlice';
import emailsSlice from './emailsSlice';
import emailTempSlice from './emailTempSlice';

const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  });
};

const userPersistConfig = {
  key: 'userDetails',
  storage,
};
const routePersistConfig = {
  key: 'route',
  storage,
};
const imagesPersistConfig = {
  key: 'image',
  storage,
};
const leadPersistConfig = {
  key: 'lead',
  storage,
};
const contactPersistConfig = {
  key: 'contact',
  storage,
};

export const store = configureStore({
  reducer: {
    roles: persistReducer(userPersistConfig, roleReducer),
    images: persistReducer(imagesPersistConfig, imageReducer),
    user: userReducer,
    route: persistReducer(routePersistConfig, routeReducer),
    advanceSearchData: advanceSearchSlice,
    leadData: persistReducer(leadPersistConfig, leadSlice),
    contactData: persistReducer(contactPersistConfig, contactSlice),
    propertyCustomFiled: propertyCustomFiledSlice,
    contactCustomFiled: contactCustomFiledSlice,
    leadCustomFiled: leadCustomFiledSlice,
    propertyData: propertySlice,
    taskData: taskSlice,
    meetingData: meetingSlice,
    emailsData: emailsSlice,
    emailTempData: emailTempSlice,
  },
  middleware,
});

export const persistor = persistStore(store);
