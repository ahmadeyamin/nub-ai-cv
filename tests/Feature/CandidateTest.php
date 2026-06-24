<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CandidateTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_access_candidates_index()
    {
        $this->get(route('candidates.index'))->assertOk();
    }

    public function test_authenticated_users_can_access_candidates_index()
    {
        $this->actingAs($user = User::factory()->create());
        
        $this->get(route('candidates.index'))->assertOk();
    }
}
