type BadgeProps = {
    children?: React.ReactNode,
    variant?: "default" | "outline"
}

const Badge = ({
    children,
    variant = "default"
}: BadgeProps) => {
    return (
        <div className={`badge badge--${variant}`}>
            { children }
        </div>
    )
}

export default Badge;