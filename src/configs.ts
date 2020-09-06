import { MarsLanderStateName } from './ai/fsm-states/types';

export interface FsmStateMc {
    maxTimetoSpend: number;
    cConst: number;
    maxRolloutSteps: number;
}

export interface MarsLanderFsmStateConfig {
    monteCarlo: FsmStateMc;
}

export interface MarsLanderAIConfig {
    [MarsLanderStateName.Landing]: MarsLanderFsmStateConfig;
}

export default {
    [MarsLanderStateName.Landing]: {
        monteCarlo: { maxTimetoSpend: 90, cConst: 5, maxRolloutSteps: 5 },
    },
};
