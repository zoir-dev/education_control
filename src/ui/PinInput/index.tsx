'use client'
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

const PinInput = ({ length, onChange, loading }: thisProps) => {
    const [values, setValues] = useState(Array(length).fill(""));

    const handleChange = (index: number, event: any) => {
        const { value } = event.target;
        if (!isNaN(value) && value !== "") {
            const newValues = [...values];
            if (newValues[index] !== '') {
                newValues[index] = value.slice(value.length - 1)
            } else {
                newValues[index] = value;
            }
            setValues(newValues);
            const newValue = newValues.join("");
            handleFocus(index + 1)
            onChange(+newValue);
        }
    };

    const handleKeyDown = (index: number, event: any) => {
        if (event.key === "Backspace") {
            const newValues = [...values];
            if (index >= 0) {
                handleFocus(index - 1)
                newValues[index] = "";
                setValues(newValues);
            }
        }
    };

    const handleFocus = (index: number) => {
        const input = document.getElementById(`pin-input-${index}`);
        input?.focus();
    };

    useEffect(() => {
        if (loading === false) {
            setValues(Array(length).fill(""))
        }
    }, [loading, length])

    return (
        <div className="flex justify-center items-center gap-2">
            {[...Array(length)].map((_, index) => (
                <Input
                    key={index}
                    id={`pin-input-${index}`}
                    type="text"
                    value={values[index]}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="pin_input pb-3 sm:pb-5"
                    isDisabled={loading}
                />
            ))}
        </div>
    );
};

export default PinInput;


interface thisProps {
    length: number,
    onChange: (val: number) => void,
    loading: boolean
}