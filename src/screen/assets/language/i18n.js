import i18next from 'i18next';
import english from './english.json'
import sinhala from './sinhala.json'

import { initReactI18next } from 'react-i18next'; 

i18next.use(initReactI18next).init({
compatibilityJSON: 'v3', 
lng:'en',
resources:{
en:english,
sn:sinhala
},
react:{
    useSuspense:false
}
})

export default i18next;