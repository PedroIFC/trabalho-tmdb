import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWI4MDdmYmYzZTI2MmVjMGE2YTkwODQzNmNjMzM1NSIsIm5iZiI6MTczMjI4NDUzMi44ODQsInN1YiI6IjY3NDA5MDc0OGI0ZTRjMmVmNmY3OTA2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xjVvb_0h03kV3Kat41jrip7k0avNapzc93v6zhrLng`,
  },
});

export default api;
