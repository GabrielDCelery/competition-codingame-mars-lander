export type ActionToStateApplier<TState, TAction> = (state: TState, action: TAction) => TState;

export type ValidActionsGetter<TState, TAction> = (state: TState) => TAction[];

export type StateScorer<TState> = ({
    numOfSteps,
    initialState,
    terminalState,
}: {
    numOfSteps: number;
    initialState: TState;
    terminalState: TState;
}) => number;

export type TerminalStateChecker<TState> = ({
    initialState,
    prevState,
    nextState,
}: {
    initialState: TState;
    prevState: TState;
    nextState: TState;
}) => boolean;

class MCNode<TState, TAction> {
    parent: MCNode<TState, TAction> | null;
    children: MCNode<TState, TAction>[];
    visitCount: number;
    valueSum: number;
    action: null | TAction;
    state: TState;

    constructor({
        parent,
        action,
        state,
    }: {
        parent: MCNode<TState, TAction> | null;
        action: TAction | null;
        state: TState;
    }) {
        this.parent = parent;
        this.children = [];
        this.visitCount = 0;
        this.valueSum = 0;
        this.action = action;
        this.state = state;
    }

    getValue(): number {
        if (this.visitCount === 0) {
            return Infinity;
        }
        return this.valueSum / this.visitCount;
    }

    isLeafNode(): boolean {
        return this.children.length === 0;
    }

    hasBeenVisited(): boolean {
        return this.visitCount > 0;
    }

    applyLeafNodes(
        availableActions: TAction[],
        applyActionAndCloneState: ActionToStateApplier<TState, TAction>
    ): void {
        this.children = availableActions.map(availableAction => {
            return new MCNode({
                parent: this,
                action: availableAction,
                state: applyActionAndCloneState(this.state, availableAction),
            });
        });
    }

    getMaxUCBNode(cConst: number): MCNode<TState, TAction> {
        let chosenNodeIndex = -1;
        let chosenNodeVale = -1;

        this.children.forEach((child, index) => {
            const nodeUCBValue =
                child.visitCount === 0
                    ? Infinity
                    : child.getValue() +
                      cConst * Math.sqrt(Math.log(this.visitCount) / child.visitCount);

            if (chosenNodeVale < nodeUCBValue) {
                chosenNodeIndex = index;
                chosenNodeVale = nodeUCBValue;
            }
        });

        return this.children[chosenNodeIndex];
    }
}

class MCSearch<TState, TAction> {
    rootNode: MCNode<TState, TAction>;
    numOfMaxIterations: number;
    maxTimetoSpend: number;
    maxRolloutSteps: number;
    cConst: number;
    getValidActions: ValidActionsGetter<TState, TAction>;
    applyActionAndCloneState: ActionToStateApplier<TState, TAction>;
    scoreState: StateScorer<TState>;
    checkIfTerminalState: TerminalStateChecker<TState>;

    constructor({
        startState,
        numOfMaxIterations,
        maxTimetoSpend,
        cConst,
        maxRolloutSteps,
        getValidActions,
        applyActionAndCloneState,
        scoreState,
        checkIfTerminalState,
    }: {
        startState: TState;
        numOfMaxIterations: number;
        maxTimetoSpend: number;
        cConst: number;
        maxRolloutSteps: number;
        getValidActions: ValidActionsGetter<TState, TAction>;
        applyActionAndCloneState: ActionToStateApplier<TState, TAction>;
        scoreState: StateScorer<TState>;
        checkIfTerminalState: TerminalStateChecker<TState>;
    }) {
        this.numOfMaxIterations = numOfMaxIterations;
        this.maxTimetoSpend = maxTimetoSpend;
        this.maxRolloutSteps = maxRolloutSteps;
        this.cConst = cConst;
        this.getValidActions = getValidActions;
        this.applyActionAndCloneState = applyActionAndCloneState;
        this.scoreState = scoreState;
        this.checkIfTerminalState = checkIfTerminalState;
        this.rootNode = new MCNode<TState, TAction>({
            parent: null,
            state: startState,
            action: null,
        });
        this.rootNode.applyLeafNodes(
            this.getValidActions(startState),
            this.applyActionAndCloneState
        );
    }

    traverse(startFromNode: MCNode<TState, TAction>): MCNode<TState, TAction> {
        let currentNode = startFromNode;
        while (!currentNode.isLeafNode()) {
            currentNode = currentNode.getMaxUCBNode(this.cConst);
        }
        return currentNode;
    }

    rollout(startFromNode: MCNode<TState, TAction>): number {
        let currentRolloutSteps = 0;
        let isTerminalState = false;
        let prevState = startFromNode.state;
        while (!isTerminalState && currentRolloutSteps < this.maxRolloutSteps) {
            currentRolloutSteps += 1;
            const availableActions = this.getValidActions(prevState);
            const randomlyChosenAction =
                availableActions[Math.floor(Math.random() * availableActions.length)];
            const nextState = this.applyActionAndCloneState(prevState, randomlyChosenAction);
            isTerminalState = this.checkIfTerminalState({
                initialState: this.rootNode.state,
                prevState,
                nextState,
            });
            prevState = nextState;
        }

        return this.scoreState({
            numOfSteps: currentRolloutSteps,
            initialState: this.rootNode.state,
            terminalState: prevState,
        });
    }

    backPropagate(startFromNode: MCNode<TState, TAction>, value: number): void {
        startFromNode.valueSum = startFromNode.valueSum + value;
        startFromNode.visitCount = startFromNode.visitCount + 1;
        if (startFromNode.parent === null) {
            return;
        }
        this.backPropagate(startFromNode.parent, value);
    }

    chooseNextAction(): TAction {
        let chosenNodeIndex = 0;
        let chosenNodeVale = 0;
        this.rootNode.children.forEach((child, index) => {
            const nodeValue = child.getValue();

            if (chosenNodeVale < nodeValue) {
                chosenNodeIndex = index;
                chosenNodeVale = nodeValue;
            }
        });
        const chosenNode = this.rootNode.children[chosenNodeIndex];
        return chosenNode.action as TAction;
    }

    run(): TAction {
        let numOfCurrentIterations = 0;
        const start = new Date().getTime();
        let keepRunning = true;
        while (keepRunning) {
            let currentNode = this.traverse(this.rootNode);

            if (currentNode.hasBeenVisited()) {
                currentNode.applyLeafNodes(
                    this.getValidActions(currentNode.state),
                    this.applyActionAndCloneState
                );
                currentNode = this.traverse(currentNode);
            }

            const value = this.rollout(currentNode);
            this.backPropagate(currentNode, value);

            numOfCurrentIterations += 1;
            const elapsed = new Date().getTime() - start;
            keepRunning =
                numOfCurrentIterations < this.numOfMaxIterations && elapsed < this.maxTimetoSpend;
        }
        return this.chooseNextAction();
    }
}

export default MCSearch;
