import { LoaderIcon } from 'lucide-react'

const LoadingSpinner = () => {
    <div className='flex flex-col items-center justify-center py-20 gap-4'>
        <LoaderIcon className='size-10 text-primary animate-spin' />
        <p className='text-muted-foreground'>Loading...</p>
    </div>
}

export default LoadingSpinner
