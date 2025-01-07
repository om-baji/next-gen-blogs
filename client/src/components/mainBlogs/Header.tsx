import { FlipWords } from '../ui/flip-words';

const Header = () => {
    const words = ["better", "cute", "beautiful", "modern"];
    return (
        <div className="flex justify-center mx-16 px-4">
            <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
                Write
                <FlipWords words={words} /> <br />
                blogs with blogs-next!
            </div>
        </div>
    )
}

export default Header
