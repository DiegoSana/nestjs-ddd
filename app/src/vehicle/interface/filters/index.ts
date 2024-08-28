import { NotFoundApplicationExceptionFilter } from './application.filters';
import { UnexpectedDomainExceptionFilter } from './domain.filters';

export default [
  NotFoundApplicationExceptionFilter,
  UnexpectedDomainExceptionFilter,
];
