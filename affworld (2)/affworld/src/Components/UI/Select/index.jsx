import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

const MultiSelect = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleCountryChange = (countries) => {
    setSelectedCountries(countries);
  };

  return (
    <div>
      <ReactFlagsSelect
        // countries={['US', 'CA', 'MX', 'GB', 'DE', 'FR', 'IN', 'CN']}
        // customLabels={{ US: 'United States', CA: 'Canada', MX: 'Mexico', GB: 'United Kingdom', DE: 'Germany', FR: 'France', IN: 'India', CN: 'China' }}
        selected={selectedCountries}
        onSelect={handleCountryChange}
        multiSelect={true}
        className="menu-flags"
        selectButtonClassName="menu-flags-button"
        searchable
        searchPlaceholder="Search country"
      />
    </div>
  );
};

export default MultiSelect;
