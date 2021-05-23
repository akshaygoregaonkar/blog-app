import axios from 'axios'
const secureAxios=axios.create({baseURL:'http://127.0.0.1:8000/'})


secureAxios.interceptors.request.use(
    config=>{
        config.headers['Authorization']=`Bearer ${localStorage.getItem('token')}`
        config.headers['Content-Type']='application/json'
        return config
    })


secureAxios.interceptors.response.use(response=>{
        console.log(" got sucess from server")
        return response
    }, error=>{
        console.log("server crashed here!")
        return Promise.reject(error)
    })

export  default secureAxios