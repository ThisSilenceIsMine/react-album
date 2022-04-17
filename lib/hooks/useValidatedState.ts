import { useState } from 'react';

type Predicate = {
  validate: (value: any) => boolean;
  error: string;
};

type ReturnValue = [string, (state: string) => void, string | null];

export const useValidatedState = (
  initialState: string,
  predicates: Predicate[]
): ReturnValue => {
  const [state, setState] = useState(initialState);
  let error: string | null = null;

  predicates.forEach((predicate) => {
    if (!predicate.validate(state)) {
      error = predicate.error;
      return;
    }
  });

  return [state, setState, error];
};
