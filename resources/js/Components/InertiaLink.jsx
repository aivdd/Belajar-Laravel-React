import { Link } from '@inertiajs/react'
export const InertiaLink = ({ href, children, ...props }) => {
    const { touchRippleRef, ...otherProps } = props

    return (
        <Link href={href} {...otherProps}>
            {children}
        </Link>
    )
}
export default InertiaLink
