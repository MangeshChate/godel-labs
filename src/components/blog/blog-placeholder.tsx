
interface BlogPlaceholderProps {
    title: string;
    excerpt?: string;
    className?: string;
    variant?: "full" | "minimal" | "hero";
    showText?: boolean;
}

function stripHtml(text: string) {
    return text
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

export function BlogPlaceholder({
    title,
    excerpt,
    className = "",
    variant = "full",
    showText = true,
}: BlogPlaceholderProps) {
    const plainTitle = stripHtml(title);
    const plainExcerpt = stripHtml(excerpt || "");

    if (variant === "hero") {
        return (
            <div className={`relative w-full h-full bg-[#f8f9fc] p-6 sm:p-10 lg:p-12 overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
                <div className="absolute -top-14 -right-10 w-72 h-72 bg-primary/18 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-12 w-64 h-64 bg-primary/12 rounded-full blur-3xl" />

                {showText && (
                    <div className="relative z-10 h-full flex items-end">
                        <h3 className="w-full text-[clamp(1.6rem,4.1vw,3.6rem)] font-black tracking-tight leading-[1.06] break-words text-primary">
                            {plainTitle}
                        </h3>
                    </div>
                )}
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <div className={`relative w-full h-full bg-[#f8f9fc] flex flex-col items-start justify-between p-3 overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/12 rounded-full blur-2xl" />
                {showText && plainTitle && (
                    <p className="relative z-10 font-black text-primary text-[10px] leading-tight break-words line-clamp-2 mt-auto">
                        {plainTitle}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full bg-[#f8f9fc] flex flex-col items-start justify-between p-6 sm:p-8 overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
            <div className="absolute -top-20 -right-16 w-48 h-48 bg-primary/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />

            <div className="relative z-10 w-full space-y-3 mt-6">
                {showText && plainTitle && (
                    <h3 className="text-lg sm:text-xl font-black text-primary leading-tight tracking-tight break-words line-clamp-3">
                        {plainTitle}
                    </h3>
                )}
                {showText && plainExcerpt && (
                    <p className="text-sm sm:text-base text-primary leading-relaxed line-clamp-3">
                        {plainExcerpt}
                    </p>
                )}
            </div>
        </div>
    );
}
