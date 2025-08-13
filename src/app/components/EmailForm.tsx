import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";

interface EmailFormProps {
    buttonText: string;
}

const EmailForm = ({
    buttonText
}: EmailFormProps) => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setToast({ message: "", type: null });
        
        try {
            const res = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            
            if (res.ok) {
                setToast({ message: "Thank you! You're on the waitlist.", type: "success" });
                setEmail("");
                setIsSubmitted(true);
                setTimeout(() => setToast({ message: "", type: null }), 5000);
            } else {
                setToast({ message: data.error || "Something went wrong.", type: "error" });
                setTimeout(() => setToast({ message: "", type: null }), 5000);
            }
        } catch {
            setToast({ message: "Network error. Please try again.", type: "error" });
            setTimeout(() => setToast({ message: "", type: null }), 5000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="email-form">
            {isSubmitted ? (
                <div className="email-form__success">
                    <FaRegCheckCircle />
                    <span>Thanks! We&apos;ll notify you when we launch.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        id="email"
                        type="email"
                        className="email-form__input"
                        placeholder="Enter your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        aria-label="Email address"
                    />
                    <button 
                        type="submit" 
                        className="email-form__button"
                        disabled={loading || !email}
                    >
                        {loading ? "Sending..." : buttonText}
                        {!loading && <GoArrowRight />}
                    </button>
                </form>
            )}
            
            {toast.message && (
                <div
                    className={`email-form__toast email-form__toast--${toast.type}`}
                    role="alert"
                    aria-live="polite"
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default EmailForm;