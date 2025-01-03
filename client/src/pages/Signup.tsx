import { SignupForm } from '@/components/auth-forms/signup-form';
import React from 'react';

const Signup: React.FC = () => {

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup
