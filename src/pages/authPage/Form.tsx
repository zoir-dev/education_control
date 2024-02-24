import { useState } from "react";
import {
    Input,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { lazyLoad } from "@/utils/lazyLoad";
import toast from "react-hot-toast";

const Form = ({ loading, auth, setLoading }: thisProps) => {
    const [passwordHide, setPasswordHide] = useState(true);
    const [validatePassword, setValidatePassword] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const router = useRouter()
    const isBrowser = typeof window !== 'undefined'

    const getIcon = () => {
        return passwordHide ? <EyeOff onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" /> : <Eye onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" />;
    };


    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            if (validatePassword) {
                if (auth) {
                    isBrowser && localStorage.setItem('phone', JSON.stringify(data.phoneNumber))
                    await lazyLoad(2000)
                    router.push('/auth/check_password')
                } else {
                    isBrowser && localStorage.setItem('token', JSON.stringify(data))
                    await lazyLoad(2000)
                    router.push('/')
                    isBrowser && localStorage.removeItem('phone')
                    toast.success('Authed successfully', {
                        className: '!bg-content1 !text-foreground'
                    })
                }
            } else {
                isBrowser && localStorage.setItem('phone', JSON.stringify(data.phoneNumber))
                await forgotPassword()
            }
        } catch (error) {

        } finally {
            reset()
            setLoading(false)
        }
    };

    const forgotPassword = async () => {
        await lazyLoad()
        router.push('/auth/check_password')
    }
    return (
        <form className="flex min-h-[300px] flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {auth &&
                <Input
                    {...register("name", { required: true, minLength: 2 })}
                    label="Name"
                    isDisabled={loading}
                    errorMessage={errors.name && 'Name must be at least 3 characters long'}
                />
            }
            <Input
                label="Phone Number"
                type="tel"
                {...register("phoneNumber", { required: true, minLength: 3 })}
                isDisabled={loading}
                errorMessage={errors.phoneNumber && 'Phone number is incorrect'}
            />
            {!auth && <Input
                {...register("password", { required: validatePassword, minLength: 5 })}
                label="Password"
                type={passwordHide ? 'password' : 'string'}
                endContent={getIcon()}
                isDisabled={loading}
                errorMessage={errors.password && validatePassword && "Password must be at least 5 characters long"}
            />}
            {auth &&
                <Select label="Role" className="" {...register('role', { required: true })}
                    errorMessage={errors.role && "Role is required"}
                >
                    <SelectItem key={1} value={1} className="!bg-content1 text-foreground">
                        1
                    </SelectItem>
                    <SelectItem key={2} value={2} className="!bg-content1 text-foreground">
                        2
                    </SelectItem>
                </Select>}
            <div className="flex flex-col items-end">
                {!auth && <button className="text-primary text-sm pb-2 cursor-pointer" type="submit" onClick={() => setValidatePassword(false)}>Forgot password?</button>}
                <Button type="submit" fullWidth color="primary" isLoading={loading}>
                    {!loading && (auth ? 'Sign up' : 'Login')}
                </Button>
            </div>
        </form>
    );
};

export default Form


interface thisProps {
    loading: boolean,
    auth?: true,
    setLoading: (val: boolean) => void
}

