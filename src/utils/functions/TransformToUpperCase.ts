import { Transform } from 'class-transformer';

export function TransformToUpperCase() {
    return Transform(({ value }) => value?.toUpperCase());
}