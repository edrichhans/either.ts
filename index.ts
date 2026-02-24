type Left<T> = {
  left: T;
  right?: never;
};

type Right<U> = {
  left?: never;
  right: U;
};

export class Either<T, U> {
  left?: T;

  right?: U;

  private constructor({ left, right }: Left<T> | Right<U>) {
    if (left) {
      this.left = left;
    } else if (right) {
      this.right = right;
    }
  }

  static makeLeft<T>(value: T): Either<T, never> {
    return new Either({ left: value });
  }

  static makeRight<U>(value: U): Either<never, U> {
    return new Either({ right: value });
  }

  isLeft(): this is Either<T, never> {
    return "left" in this && this.left !== undefined;
  }

  isRight(): this is Either<never, U> {
    return "right" in this && this.right !== undefined;
  }

  getLeft(): T {
    if (this.isLeft()) {
      return this.left!;
    }
    throw new Error("Tried to get left value from a right Either");
  }

  getRight(): U {
    if (this.isRight()) {
      return this.right!;
    }
    throw new Error("Tried to get right value from a left Either");
  }
}
