function Card({ className, ...children }: React.ComponentProps<"div">) {
return (
    <div
    data-slot="card"
    className={className}
    {...children}
    />
);
}

function CardContent({ className, ...children }: React.ComponentProps<"div">) {
return (
    <div
    data-slot="card-content"
    className={className}
    {...children}
    />
);
}

export { Card, CardContent };