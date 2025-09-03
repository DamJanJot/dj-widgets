<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        foreach (range(1, 15) as $i) {
            $title = "Sample news #$i";
            News::create([
                'title' => $title,
                'slug' => Str::slug($title) . "-$i",
                'excerpt' => 'Short excerpt...',
                'body' => 'Longer body of the news...',
                'source_url' => null,
                'published_at' => now()->subDays(15 - $i),
            ]);
        }
    }
}
