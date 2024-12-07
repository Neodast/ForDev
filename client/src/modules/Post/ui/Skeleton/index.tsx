import { Container } from '@/components/Post/ui';
import { Skeleton } from 'antd';

export function PostSkeleton() {
  <>
    <Container className="mt-20 mb-6 mr-32 ml-72 h-56">
      <Skeleton avatar={true} />
    </Container>
    <Container className="mb-6 mr-32 ml-72 h-32 w-[50%]">
      <Skeleton avatar={false} />
    </Container>
  </>;
}
