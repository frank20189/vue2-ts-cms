// import axios from 'axios'

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data.data.banner)
// })

// axios的配置选项
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASEURL)

// axios.interceptors.request.use(
//   (config) => {
//     // 请求成功的拦截
//     return config
//   },
//   (err) => {
//     // 请求失败的拦截
//     console.log(err)
//     return err
//   }
// )

// axios.interceptors.response.use(
//   (resp) => {
//     // 请求成功的拦截
//     return new Promise((resolve, rejects) => {
//       resp.status === 200 && resolve(resp.data)
//       resp.status !== 200 && rejects(resp.data)
//     })
//   },
//   (err) => {
//     return err
//   }
// )
