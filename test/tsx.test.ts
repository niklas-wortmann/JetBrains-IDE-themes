import { expect, it } from 'vitest';
import { getJetBrainsHighlighter } from './util/jetbrains-themed-instance';

it('renders tsx properly in dark theme', async () => {
    const shiki = await getJetBrainsHighlighter();
    const out = await shiki.codeToHtml(
        `
export class Counter extends Component<CounterProps> {  
    render() {
        const { label = "Count" } = this.props;
        return (
            <div>
                <span title="Count Label">{label}</span>
                <span id="counter" title="Current Count">
                    1
                </span>
            </div>
        );
    }
}`,
        { theme: 'Jetbrains Dark Theme', lang: 'tsx' }
    );

    expect(out).toMatchFileSnapshot('./out/tsx.html');
});
