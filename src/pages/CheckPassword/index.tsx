'use client'
import PinInput from "@/ui/PinInput";
import { lazyLoad } from "@/utils/lazyLoad";
import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckPassword = () => {
    const defaultTime = 60
    const [value, setValue] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState(defaultTime)
    const router = useRouter()
    const length = 4

    const checkPassword = async () => {
        try {
            if (JSON.stringify(value).length === length) {
                setLoading(true)
                await lazyLoad()
                router.push('/auth/reset_password')
            }
        } catch (error) {

        } finally {
            setLoading(false)
            setValue(0)
        }
    }

    const resendPassword = () => {
        setTime(defaultTime)
        console.log(JSON.parse(localStorage.getItem('phone') || ''))
    }

    setTimeout(() => {
        if (time > 0) {
            setTime(time - 1)
        }
    }, 1000)


    return (
        <div className="flex h-[80vh] w-full items-center justify-center px-3">
            <Card className="w-[340px] max-w-full shadow-lg px-3 py-3 sm:py-5 sm:px-5">
                <h2 className="text-xl sm:text-2xl pb-1">Confirmation</h2>
                <p className="sm:text-base pb-3 sm:pb-5">Enter the password we sent you!</p>
                <PinInput length={length} loading={loading} onChange={(val: number) => setValue(val)} />
                <div className="flex flex-col items-start gap-3">
                    {time !== 0 ? <p className="text-sm">You get the password in <span className="text-base">{time}</span></p> :
                        <button className="text-sm" onClick={resendPassword}>Resend password</button>}
                    <Button onClick={checkPassword} fullWidth color="primary" isLoading={loading}>
                        Confirm
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default CheckPassword;
