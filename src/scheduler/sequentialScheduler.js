import { Scheduler } from "./scheduler.js"

export class SequentialScheduler extends Scheduler {
  next(cards, state) {
    const nextIndex = (state.currentIndex + 1) % cards.length

    return {
      card: cards[nextIndex],
      nextState: {
        ...state,
        currentIndex: nextIndex
      }
    }
  }
}
