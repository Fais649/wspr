import { writable } from "svelte/store";

export enum ElementType {
  itemList,
  note,
  todoItem,
  eventItem
}

interface ElementInfo {
  id: string;
  type: ElementType;
}

interface ActiveElementInfo {
  current: ElementInfo | null;
  prev: ElementInfo | null;
}

interface ClickInfo {
  current: ElementInfo | null;
  prev: ElementInfo | null;
}

interface FocusInfo {
  clickInfo: ClickInfo;
  activeElementInfo: ActiveElementInfo;
}

export const focusedInput = writable<FocusInfo>(undefined, (set) => {
  let clickInfo: ClickInfo = {
    current: null,
    prev: null,
  };

  let activeElementInfo: ActiveElementInfo = {
    current: null,
    prev: null,
  };

  function getElementInfo(element: HTMLElement | null): ElementInfo | null {
    if (!element) return null;

    let el: HTMLElement | null = element;
    while (el && el !== document.body) {
      const dataType = el.getAttribute("data-type");
      if (dataType) {
        const id = el.id || "";
        let type: ElementType | undefined;

        switch (dataType) {
          case "itemList":
            type = ElementType.itemList;
            break;
          case "todoItem":
            type = ElementType.todoItem;
            break;
          case "note":
            type = ElementType.note;
            break;

          default:
            break;
        }

        if (!type) {
          return null;
        }

        return {
          id: id,
          type: type,
        };
      }

      el = el.parentElement;
    }
    return null;
  }

  function handleClick(e: MouseEvent) {
    const element = e.target as HTMLElement;
    clickInfo = {
      current: getElementInfo(element),
      prev: clickInfo.current,
    };
    setFocusInfo();
  }

  function handleFocusIn(e: FocusEvent) {
    const element = e.target as HTMLElement;
    activeElementInfo = {
      current: getElementInfo(element),
      prev: activeElementInfo.current,
    };
    setFocusInfo();
  }

  function setFocusInfo() {
    set({
      clickInfo: clickInfo,
      activeElementInfo: activeElementInfo,
    });
  }

  window.addEventListener("click", handleClick);
  window.addEventListener("focusin", handleFocusIn);

  return () => {
    window.removeEventListener("click", handleClick);
    window.removeEventListener("focusin", handleFocusIn);
  };
});
