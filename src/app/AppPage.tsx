import AppLayout from './AppLayout'
import Canvas from '../components/Canvas/Canvas'

const AppPage = () => {
    return (
        <div className="min-h-screen bg-neutral-100">
            <AppLayout>
                <Canvas />
            </AppLayout>
        </div>
    )
}

export default AppPage