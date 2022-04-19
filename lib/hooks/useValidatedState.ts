import { useRef, useState } from 'react';

type Predicate = {
  validate: (value: any) => boolean;
  error: string;
};

type ReturnValue = [string, (state: string) => void, string | undefined];

export const useValidatedState = (
  initialState: string,
  predicates: Predicate[]
): ReturnValue => {
  const [state, setState] = useState(initialState);

  const error = predicates.find(
    (predicate) => !predicate.validate(state)
  )?.error;

  return [state, setState, error];
};
