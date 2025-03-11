import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import Button, { ButtonVariant, ButtonSize } from "@/components/ui/form/buttons/Button";
import classNames from "classnames";

interface IconButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    name?: string;
    Icon: SvgIconComponent;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            type = "button",
            variant = "primary",
            size = "sm",
            disabled = false,
            name,
            Icon,
            handleClick,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                type={type}
                variant={variant}
                size={size}
                disabled={disabled}
                name={name}
                className={classNames("flex items-center gap-2", className)}
                handleClick={handleClick}
                {...props}
            >
                <Icon fontSize={size === "lg" ? "medium" : "small"} />
                {children}
            </Button>
        );
    }
);

IconButton.displayName = "IconButton";

export default IconButton;
