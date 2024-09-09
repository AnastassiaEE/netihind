'use client'

import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from "../form/Button";

export default function ConsultationButton({
    type = 'desktop'
}: {
    type?: 'desktop' | 'mobile' 
}) {
    return (
        <a href="tel:+37256979125">
            <Button size="lg" className={`!pt-0.5 !pb-1 ${type == 'mobile' && '!px-2'} rounded-md`}>
                <div className="flex items-center">
                    <PhoneInTalkIcon fontSize="large" className={type == 'desktop' ? "mr-6" : ''}/>
                    { type == 'desktop' &&
                        <div className="flex flex-col text-left">
                            <span className="text-base font-bold">+37256979125</span>
                            <span className="text-xs uppercase">Free consultation</span>
                        </div>
                    }
                </div>
            </Button>
        </a>
    )
}