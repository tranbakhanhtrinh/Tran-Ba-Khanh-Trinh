import clsx from 'clsx'

type Props = {
  type?: string
  id?: string
  title?: string
  state: string | number
  placeholder?: string
  className?: string
  setState: (e: EventTarget & HTMLInputElement) => void
  onKeyDown?: (e: KeyboardEvent) => void
}

const Input = ({
  id,
  type,
  title,
  className,
  state,
  placeholder,
  setState,
  onKeyDown
}: Props) => {
  return (
    <div className='flexStart flex-col gap-4'>
      {title && (
        <label
          htmlFor={id}
          className='w-full'
        >
          {title}
        </label>
      )}
      <input
        type={type || 'text'}
        id={id}
        name={id}
        placeholder={placeholder}
        required
        value={state}
        autoComplete='off'
        className={clsx(
          className,
          'form_field-input',
          type === 'search' ? 'search-icon' : ''
        )}
        onChange={(e) => setState(e.target)}
        onKeyDown={(e) => onKeyDown && onKeyDown(e as unknown as KeyboardEvent)}
      />
    </div>
  )
}

export default Input
