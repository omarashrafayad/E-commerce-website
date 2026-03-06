
interface PageHeaderProps {
    title: string;
    description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground text-gray-500">
                {description}
            </p>
        </div>
    );
}
