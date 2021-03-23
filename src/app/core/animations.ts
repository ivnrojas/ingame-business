import { animate, state, style, transition, trigger } from "@angular/animations";

export const rouletteAnimation = 
trigger('windowAnimation', [
    state('inactive', style({
        right: 0
    })),
    state('active', style({
        transform: `translateX(-77.${calculateJiggle()}%)`
        // transform: 'translateX(-77.15%)'
    })),
    transition('inactive => active', animate('6000ms ease'))
]);

export function calculateJiggle(): number {
    const maxJiggleToTheRight: number = 41;
    const maxJiggleToTheLeft: number = 15;
    return Math.floor((Math.random()*(maxJiggleToTheRight - maxJiggleToTheLeft))+maxJiggleToTheLeft);
}