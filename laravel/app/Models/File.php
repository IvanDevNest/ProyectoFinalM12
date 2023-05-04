<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    

    protected $fillable = [
        'filepath',
        'filesize',
    ];
    
     public function user()
     {
         return $this->hasOne(User::class);
     }
     public function message()
     {
         return $this->hasOne(Message::class);
     }
    /**
     * Store uploaded file at disk and DB
     * 
     * @param UploadedFile $upload
     * @return bool
     */
    public function diskSave(UploadedFile $upload)
    {
        $fileName = $upload->getClientOriginalName();
        $fileSize = $upload->getSize();
        Log::debug("Storing file '{$fileName}' ($fileSize)...");
        
        // Store file at disk
        $uploadName = time() . '_' . $fileName;
        $filePath = $upload->storeAs(
            'uploads',      // Path
            $uploadName ,   // Filename
            'public'        // Disk
        );
        
        $stored = Storage::disk('public')->exists($filePath);

        if ($stored) {
            Log::debug("Disk storage OK");
            $fullPath = Storage::disk('public')->path($filePath);
            Log::debug("File saved at {$fullPath}");
            // Update model properties
            $this->filepath = $filePath;
            $this->filesize = $fileSize;
            $this->save();
            Log::debug("DB storage OK");
            return true;
        } else {
            Log::debug("Disk storage FAILS");
            return false;
        }
    }

    /**
     * Delete uploaded file from disk and DB
     * 
     * @return bool
     */
    public function diskDelete()
    {
        Log::debug("Deleting file '{$this->id}'...");
        Storage::disk('public')->delete($this->filepath);
        Log::debug("Disk storage OK");
        $this->delete();
        Log::debug("DB storage OK");
        return true;
    }
}
