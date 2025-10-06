export type CardImage = {
    src: string;
    alt?: string;
    // starting offsets relative to center
    initial?: {
        x?: number;
        y?: number;
        scale?: number;
        rotate?: number;
    }
    className?: string;
    width?: number;
    height?: number;
}