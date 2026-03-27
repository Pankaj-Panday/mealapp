import Ionicons from '@react-native-vector-icons/ionicons';

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginationParams = Partial<
  Omit<PaginationMeta, 'total' | 'totalPages'>
>;

export type PaymentMethod = 'COD' | 'ONLINE';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type MenuItem =
  | {
      type: 'divider';
    }
  | {
      type: 'item';
      icon: IconName;
      title: string;
      subtitle?: string;
    };
