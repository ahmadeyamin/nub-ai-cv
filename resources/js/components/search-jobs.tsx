import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
    query: string;
    location: string;
    jobType: string;
    salaryRange: string;
}

interface SearchJobsProps {
    onFiltersChange: (filters: SearchFilters) => void;
    initialFilters?: Partial<SearchFilters>;
}

export default function SearchJobs({ onFiltersChange, initialFilters = {} }: SearchJobsProps) {
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        location: '',
        jobType: '',
        salaryRange: '',
        ...initialFilters
    });

    const [showFilters, setShowFilters] = useState(false);

    const updateFilter = (key: keyof SearchFilters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            query: '',
            location: '',
            jobType: '',
            salaryRange: ''
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const hasActiveFilters = filters.query || filters.location || filters.jobType || filters.salaryRange;

    return (
        <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    placeholder="Search for jobs, companies, or keywords..."
                    value={filters.query}
                    onChange={(e) => updateFilter('query', e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Location
                            </label>
                            <Input
                                placeholder="City or remote..."
                                value={filters.location}
                                onChange={(e) => updateFilter('location', e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Job Type
                            </label>
                            <Select value={filters.jobType} onValueChange={(value) => updateFilter('jobType', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Types</SelectItem>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Salary Range
                            </label>
                            <Select value={filters.salaryRange} onValueChange={(value) => updateFilter('salaryRange', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select salary range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Salaries</SelectItem>
                                    <SelectItem value="0-30k">$0 - $30k</SelectItem>
                                    <SelectItem value="30k-50k">$30k - $50k</SelectItem>
                                    <SelectItem value="50k-70k">$50k - $70k</SelectItem>
                                    <SelectItem value="70k-100k">$70k - $100k</SelectItem>
                                    <SelectItem value="100k+">$100k+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex flex-wrap gap-2">
                            {hasActiveFilters && (
                                <Button variant="outline" size="sm" onClick={clearFilters}>
                                    <X className="w-4 h-4 mr-2" />
                                    Clear All
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {filters.query && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Search: {filters.query}
                            <X 
                                className="w-3 h-3 cursor-pointer" 
                                onClick={() => updateFilter('query', '')}
                            />
                        </Badge>
                    )}
                    {filters.location && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Location: {filters.location}
                            <X 
                                className="w-3 h-3 cursor-pointer" 
                                onClick={() => updateFilter('location', '')}
                            />
                        </Badge>
                    )}
                    {filters.jobType && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Type: {filters.jobType}
                            <X 
                                className="w-3 h-3 cursor-pointer" 
                                onClick={() => updateFilter('jobType', '')}
                            />
                        </Badge>
                    )}
                    {filters.salaryRange && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Salary: {filters.salaryRange}
                            <X 
                                className="w-3 h-3 cursor-pointer" 
                                onClick={() => updateFilter('salaryRange', '')}
                            />
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
}
