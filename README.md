# either.ts
Minimal Either implementation in Typescript. To know more, see [Vavr Either](https://www.javadoc.io/doc/io.vavr/vavr/0.10.0/io/vavr/control/Either.html)

Remember -- *Right is right*

# Usage

```ts
import { Either } from 'either.ts'

function myEitherFunction(): Either<MyErrorType, Response> {
  try {
    const response = ...
    return Either.makeRight(response);
  } catch (error) {
    return Either.makeLeft(MyErrorType(error.message));
  }
}

function parentOfEitherFunction(): Either<MyErrorType, null> {
    const responseEither = myEitherFunction();

    if responseEither.isLeft() {
        // Handle errors
        const errorObject = responseEither.getLeft();

        // Or bubble up
        return responseEither;
    }

    // Get the original value from the right
    const response = responseEither.getRight();
    return Either.makeRight(null);
}
```