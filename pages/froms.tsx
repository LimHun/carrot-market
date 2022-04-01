import { FieldErrors, useForm } from "react-hook-form";
// Less code
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Donts deal with events
// Easier Inputs

interface LoginForm {
    username : string;
    password: string;
    email: string;
}

export default function Froms() {
    // register : input 을 state와 연결시켜주는 역할
    // handleSubmit : 두개의 함수를 반환함. 기본은 1개. 기본 함수는 유요한 input 일때, 추가는 유효하지 않을때 이다.
    const { register, handleSubmit, formState : {errors}} = useForm<LoginForm>() 
    const onValid = (data : LoginForm) => {
        console.log("유효함")
    } 
    const onInvalid = (errors: FieldErrors) => {
        console.log("유효하지 않음")
        console.log(errors)
    }
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className="p-10">
                <input className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    {...register("username", {
                        required: "유저이름 필수",
                        minLength: {
                            message: "이름 8글자",
                            value: 8
                        }
                    })}
                    type="text"
                    placeholder="Username"  
                />
                <div className={`${Boolean(errors.username?.message) ? "text-red-500" : "text-white"} `}>
                    { Boolean(errors.username?.message) ? errors.username?.message : " "}
                </div>
                <input className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 mt-3" 
                    {...register("email", {required : "이메일 필수",
                    validate: {
                        notGmail: (value) => !value.includes("@gmail.com") || "Gamil 이메일은 사용할 수 없습니다.",
                        notNaver: (value) => !value.includes("@naver.com") || "Naver 이메일은 사용할 수 없습니다."
                    }, pattern: {
                        value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"이메일 형식이 아닙니다."
                    }})}
                    type="email"
                    placeholder="Email" 
                />
                <div className={`py-3 ${Boolean(errors.email?.message) ? "text-red-500" : "text-white"} `}>
                    { Boolean(errors.email?.message) ? errors.email?.message : " "}
                </div>
                <input className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 pt-3" 
                    {...register("password", {required: "비번 필수"})}
                    type="password"
                    placeholder="Password" 
                />
                <input 
                    className="mt-3 px-6 py-3 w-full bg-green-400 text-white font-semibold rounded-lg"
                    type="submit" 
                    value="Create Account" 
                    />
            </div>
            
        </form>
    )
}