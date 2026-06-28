export default function Button ( {
    children,
    variant = "primary",
    loading = false,
    fullWidth = false,
    disabled = false,
    type = "button",
    className = "",
    ...props
} ) {
    const isDisabled = loading || disabled;

    return (
        <button
            type={ type }
            disabled={ isDisabled }
            aria-disabled={ isDisabled }
            className={ [
                "btn",
                `btn-${ variant }`,
                fullWidth ? "btn-block" : "",
                loading ? "btn-loading" : "",
                className
            ]
                .filter( Boolean )
                .join( " " ) }
            { ...props }
        >
            { loading ? (
                <>
                    <span className="spinner" aria-hidden="true" />
                    <span>در حال پردازش...</span>
                </>
            ) : (
                children
            ) }
        </button>
    );
}