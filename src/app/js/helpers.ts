import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const resizeWindow = (
    desktopCallback: (e: Window) => void,
    mobileCallback: (e: Window) => void
) => {
    if (window.innerWidth < 992) {
        mobileCallback(window);
    } else {
        desktopCallback(window);
    }

    fromEvent(window, 'resize')
        .pipe(debounceTime(200))
        .subscribe((e) => {
            if ((<Window>e.target).innerWidth < 992) {
                mobileCallback(window);
            } else {
                desktopCallback(window);
            }
        });
};
