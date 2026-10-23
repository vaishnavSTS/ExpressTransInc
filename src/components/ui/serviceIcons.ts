import { Container, Package, type LucideIcon } from 'lucide-react';
import type { ServiceId } from '../../data/services';

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  'general-freight': Package,
  'intermodal-containers': Container,
};
