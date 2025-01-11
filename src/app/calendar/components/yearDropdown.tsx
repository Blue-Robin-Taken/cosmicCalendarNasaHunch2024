import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { earthYears } from '../data/earthYears';
import clsx from 'clsx';
import { useState } from 'react';
import ttime from '@tubular/time';

export default function YearDropdown({ selected, setSelected }: any) {
    const [query, setQuery] = useState('');

    const filteredYears =
        query === ''
            ? earthYears
            : earthYears.filter((yearYear) => {
                  return yearYear.year
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <div className="relative self-center w-36 z-10">
            <Combobox
                value={selected}
                virtual={{ options: filteredYears }}
                onChange={(value) => setSelected(value)}
                onClose={() => setQuery('')}
            >
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border-none bg-black/5 dark:bg-white/5 py-1.5 pr-8 pl-3 text-3xl text-lm-h1-text dark:text-dm-h1-text font-CommeReg',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 data-[focus]:dark:outline-white/25'
                        )}
                        displayValue={(yearYear) => yearYear?.year}
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    className="!max-h-[12rem] w-[var(--input-width)] 
          border empty:invisible rounded-xl border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5 text-lm-h1-text dark:text-dm-h1-text p-1"
                >
                    {({ option: yyear }) => (
                        <ComboboxOption
                            value={yyear}
                            className="data-[focus]:bg-dm-yellow-hl data-[disabled]:opacity-50 group flex 
              cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                            {yyear.year}
                        </ComboboxOption>
                    )}
                </ComboboxOptions>
            </Combobox>
        </div>
    );
}
