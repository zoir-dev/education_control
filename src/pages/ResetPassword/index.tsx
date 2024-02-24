'use client'
import { lazyLoad } from "@/utils/lazyLoad"
import { Button, Card, Input } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [passwordHide, setPasswordHide] = useState(true)
    const [valid, setValid] = useState(false)
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState('')

    const router = useRouter()

    const getIcon = () => {
        return passwordHide ? <EyeOff onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" /> : <Eye onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" />;
    };

    const resetPassword = async () => {
        setValid(true)
        if (password === reset && password.length >= 5) {
            try {
                setLoading(true)
                await lazyLoad()
                router.push('/')
                localStorage.setItem('token', 'asdf')
                toast.success('Authed successfully', {
                    className: '!bg-content1 !text-foreground'
                })

            } catch (error) {
                toast.error('Eror occured while resetting your passwor', {
                    className: '!bg-content1 !text-foreground'
                })
            } finally {
                setValid(false)
                setLoading(false)
                setPassword('')
                setReset('')
            }
        }
    }

    return (
        <div className="flex h-[80vh] w-full items-center justify-center px-3">
            <Card className="w-[340px] max-w-full shadow-lg px-3 py-3 sm:py-5 sm:px-5">
                <h2 className="text-xl sm:text-2xl pb-3">Set your password!</h2>
                <div className="flex flex-col gap-5">
                    <Input
                        label="Password"
                        type={passwordHide ? 'password' : 'string'}
                        endContent={getIcon()}
                        isDisabled={loading}
                        errorMessage={valid && password.length < 5 && "Password must be at least 5 characters long"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Reset Password"
                        type={passwordHide ? 'password' : 'string'}
                        endContent={getIcon()}
                        isDisabled={loading}
                        errorMessage={valid && reset !== password && "Password is not match"}
                        value={reset}
                        onChange={(e) => setReset(e.target.value)}
                    />
                    <Button fullWidth color="primary" isLoading={loading} onClick={resetPassword}>
                        {!loading && 'Set'}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ResetPassword