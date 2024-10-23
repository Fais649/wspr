export interface Preferences {
  theme: string;
}

export interface Content {
  note: string;
  todo: TodoItem[];
  event: EventItem[]
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
  isChild: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  desc: string;
  startDate: number;
  endDate: number;
}

export interface Timer {
  name: string,
  seconds: number,
}

export interface DeviceInfo {
  os: string,
  heightPx: number,
  widthPx: number,
  kbHeightPx: number,
}

export interface PaymentItem {
  id: string;
  title: string;
  categoryId: string;
  amount: number;
  accountId: string;
}

export interface PaymentAccount {
  id: string,
  title: string,
}

export interface PaymentCategory {
  id: string,
  title: string,
}
